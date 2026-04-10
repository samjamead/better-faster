export type TeeNineData = {
  par: number;
  courseRating: number;
  slopeRating: number;
};

export type Hole = {
  hole: number;
  yards: number;
  par: number;
  si: number;
  si9holes: number;
};

export type TeeData = {
  course: string;
  tee: string;
  par: number;
  courseRating: number;
  slopeRating: number;
  front: TeeNineData;
  back: TeeNineData;
  holes: Hole[];
};
