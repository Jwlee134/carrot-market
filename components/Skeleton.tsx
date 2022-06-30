import SkeletonComponent, { SkeletonProps } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface Props extends SkeletonProps {}

const Skeleton = ({ ...rest }: Props) => <SkeletonComponent {...rest} />;

export default Skeleton;
