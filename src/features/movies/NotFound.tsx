import "./NotFound.scss";

export const NotFound = (props: any) => {
  const { msg } = props;
  if (!msg)
    return (
      <div className="not-found">
        <h2>Nothing Found</h2>
      </div>
    )
  else return (
    <div className="not-found">
      <h2>{msg}</h2>
    </div>
  )
}