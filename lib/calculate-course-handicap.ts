export const calculateCourseHandicap = (
  handicapIndex: number,
  courseRating: number,
  slopeRating: number,
  par: number,
) => {
  return handicapIndex * (113 / slopeRating) + (courseRating - par);
};
