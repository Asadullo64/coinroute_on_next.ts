import Link from "next/link";

import { navBarItems } from "@/constant/constant";

import { CurrencyDropdown } from "../CurrencyDropdown";
import styles from "./style.module.scss";


interface NavbarProps {
  onPairChange: (pair: string) => void;
}

const NavbarItems = () =>
  navBarItems.map((item) => (
    <li key={item.title}>
      <Link href={item.link}>{item.title}</Link>
    </li>
  ));

export const Navbar: React.FC<NavbarProps> = ({ onPairChange }) => (
  <nav className={styles.navbar}>
    <ul className={styles.navbar_list}>
      <NavbarItems />
    </ul>
    <CurrencyDropdown onPairChange={onPairChange} />
  </nav>
);
