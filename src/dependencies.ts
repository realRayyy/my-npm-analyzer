import Analyzer from "./analyzer";
import { DepNode } from "./type";

class Dependencies {
  constructor(depth: number = -1) {
    this.dependencies = {
      name: "root",
      version: "",
      depth: 0,
      dependencies: {},
      devDependencies: {},
    };

    this.Analyzer = new Analyzer(this.dependencies, depth);
  }

  public dependencies: DepNode;

  private Analyzer: Analyzer;

  public analyze = async () => {
    await this.Analyzer.analyze();
    return this.dependencies;
  };
}

export default Dependencies;
