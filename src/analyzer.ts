import { readFile } from "fs/promises";
import { DepNode, PackageDep } from "./type";

const baseUrl = "./node_modules/";

class Analyzer {
  constructor(root: DepNode, depth: number) {
    this.currentNode = root;
    this.nodeQueue = [];
    this.nodeMap = new Map();

    this.depth = depth;
  }

  private depth: number;

  private currentNode: DepNode;
  private nodeQueue: DepNode[];
  private nodeMap: Map<string, DepNode>;

  public analyze = async () => {
    await this.readPackage("./package.json");
    while (this.nodeQueue.length) {
      await this.next();
    }
  };

  private readPackage = async (url: string) => {
    const json = await readFile(url, { encoding: "utf-8" });
    const data = JSON.parse(json);

    this.getDep(data.dependencies);

    this.getDevDep(data.devDependencies);
  };

  private getDep = (data: PackageDep) => {
    for (let key in data) {
      if (!this.nodeMap.has(key + data[key])) {
        this.currentNode.dependencies[key] = {
          name: key,
          depth: this.currentNode.depth + 1,
          version: data[key],
          dependencies: {},
          devDependencies: {},
        };
        this.nodeMap.set(key + data[key], this.currentNode.dependencies[key]);
        if (this.depth !== -1 && this.depth < this.currentNode.depth + 1)
          this.nodeQueue.push(this.currentNode.dependencies[key]);
      } else this.currentNode.dependencies[key] = this.nodeMap.get(key)!;
    }
  };

  private getDevDep = (data: PackageDep) => {
    for (let key in data) {
      this.currentNode.devDependencies[key] = {
        name: key,
        version: data[key],
      };
    }
  };

  private next = async () => {
    const node = this.nodeQueue.shift();
    if (!node) return;
    this.currentNode = node;
    await this.readPackage(`${baseUrl + node.name}/package.json`);
  };
}
export default Analyzer;
