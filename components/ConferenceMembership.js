import { faFileArchive, faInfo } from "@fortawesome/free-solid-svg-icons";
import MenuItem from "./MenuItem";
import SideMenu from "./SideMenu";

export default function ConferenceMembership({ slug }) {
  return (
    <SideMenu>
      <MenuItem icon={faInfo} href={`/conferences/${slug}`}>
        Сведения
      </MenuItem>
      <MenuItem icon={faFileArchive} href={`/conferences/${slug}/materials`}>
        Материалы
      </MenuItem>
    </SideMenu>
  )
}