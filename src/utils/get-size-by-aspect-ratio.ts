export default function getSizeByAspectRatio(
  maxWidth: number,
  maxHeight: number,
  aspectRatio: number
) {
  const width =
    maxWidth / aspectRatio > maxHeight ? maxHeight * aspectRatio : maxWidth;
  const height =
    maxHeight * aspectRatio > maxWidth ? maxWidth / aspectRatio : maxHeight;

  return {
    width,
    height,
  };
}
