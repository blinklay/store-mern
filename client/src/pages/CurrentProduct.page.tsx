import useAxios from "../hooks/useAxios";

export default function CurrentProductPage() {
  const { result, error, isLoading } = useAxios("/");

  return <div>CurrentProduct.page</div>;
}
