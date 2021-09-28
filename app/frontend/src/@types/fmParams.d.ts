export type chromosomesParams = {
  chromosome1: {
    fmParamsList: fmParamsList;
    fitness: string;
    algorithmNum: string;
  };
  chromosome2: {
    fmParamsList: fmParamsList;
    fitness: string;
    algorithmNum: string;
  };
  chromosome3: {
    fmParamsList: fmParamsList;
    fitness: string;
    algorithmNum: string;
  };
  chromosome4: {
    fmParamsList: fmParamsList;
    fitness: string;
    algorithmNum: string;
  };
  chromosome5: {
    fmParamsList: fmParamsList;
    fitness: string;
    algorithmNum: string;
  };
  chromosome6: {
    fmParamsList: fmParamsList;
    fitness: string;
    algorithmNum: string;
  };
  chromosome7: {
    fmParamsList: fmParamsList;
    fitness: string;
    algorithmNum: string;
  };
  chromosome8: {
    fmParamsList: fmParamsList;
    fitness: string;
    algorithmNum: string;
  };
  chromosome9: {
    fmParamsList: fmParamsList;
    fitness: string;
    algorithmNum: string;
  };
  chromosome10: {
    fmParamsList: fmParamsList;
    fitness: string;
    algorithmNum: string;
  };
};

export type fmParamsList = {
  [key: string]: fmParamsType;
};

export type fmParamsType = {
  attack: number;
  decay: number;
  sustain: number;
  release: number;
  frequency: number;
  // キャリア周波数に対するモジュレータの周波数の比率
  ratioToFoundamentalFrequency: number;
  //   変調指数
  modulationIndex: number;
};
