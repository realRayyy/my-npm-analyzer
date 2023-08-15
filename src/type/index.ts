export interface PackageDep {
  [key: string]: string;
}

export interface DepNode {
  name: string;
  version: string;
  depth: number;
  dependencies: {
    [key: string]: DepNode;
  };
  devDependencies: {
    [key: string]: DevDepNode;
  };
}

export interface DevDepNode {
  name: string;
  version: string;
}
