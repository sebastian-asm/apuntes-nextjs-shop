interface Props {
  params: { id: string }
}

export default function CategoryPage({ params }: Props) {
  const { id } = params
  console.log(id)
  return <section>Category Page: {id}</section>
}
