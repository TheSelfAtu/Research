export type genesParams = {
  gene1: { fmParamsList: fmParamsList; fitness: string; algorithmNum: string };
  gene2: { fmParamsList: fmParamsList; fitness: string; algorithmNum: string };
  gene3: { fmParamsList: fmParamsList; fitness: string; algorithmNum: string };
  gene4: { fmParamsList: fmParamsList; fitness: string; algorithmNum: string };
  gene5: { fmParamsList: fmParamsList; fitness: string; algorithmNum: string };
  gene6: { fmParamsList: fmParamsList; fitness: string; algorithmNum: string };
  gene7: { fmParamsList: fmParamsList; fitness: string; algorithmNum: string };
  gene8: { fmParamsList: fmParamsList; fitness: string; algorithmNum: string };
  gene9: { fmParamsList: fmParamsList; fitness: string; algorithmNum: string };
  gene10: { fmParamsList: fmParamsList; fitness: string; algorithmNum: string };
};

export type fmParamsList = {
  [key: string]: fmParamsType;
  fitness?: number;
};

export type fmParamsType = {
  atack: number;
  decay: number;
  sustain: number;
  release: number;
  frequency: number;
  // キャリア周波数に対するモジュレータの周波数の比率
  ratioToFoundamentalFrequency: number;
  //   変調指数
  modulationIndex: number;
};
