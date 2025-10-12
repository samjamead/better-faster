export const calculateCourseHandicap = ({
  handicapIndex,
  courseRating = 72,
  slopeRating = 113,
  par = 72,
}: {
  handicapIndex: number;
  courseRating: number;
  slopeRating: number;
  par: number;
}) => {
  return Math.round(handicapIndex * (slopeRating / 113) + (courseRating - par));
};
