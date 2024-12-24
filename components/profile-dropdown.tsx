import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/avatar";

interface DropdownItemProps {
  key: string;
  content: string;
  isProfile?: boolean;
  email?: string;
}

interface ProfileDropdownProps {
  items: DropdownItemProps[];
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ items }) => (
  <Dropdown>
    <DropdownTrigger>
      <Avatar
        isBordered
        as="button"
        className="transition-transform"
        color="secondary"
        name="Jason Hughes"
        size="sm"
        src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
      />
    </DropdownTrigger>
    <DropdownMenu aria-label="Dynamic Actions" variant="flat" items={items}>
      {(item) => (
        <DropdownItem
          key={item.key}
          className={item.key === "logout" ? "text-danger" : ""}
          color={item.key === "logout" ? "danger" : "default"}
        >
          {item.isProfile ? (
            <div>
              <p className="font-semibold">{item.content}</p>
              <p className="font-semibold">{item.email}</p>
            </div>
          ) : (
            item.content
          )}
        </DropdownItem>
      )}
    </DropdownMenu>
  </Dropdown>
);

export default ProfileDropdown;