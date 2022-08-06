import { ListItem } from "./ListItem";
import "./VerticalList.scss";


export const VerticalList = (props: any) => {

  const { items } = props;

  return (
    <ul className="vertical-list">
      {items.map((item: any) => {
        return <ListItem key={item.id} movie={item} />
      })}
    </ul>
  )
}