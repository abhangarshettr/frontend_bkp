import React from 'react';  // <-- Import React here
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import Link from "next/link";
const ActiveLink = ({ href, children }) => {
  const { asPath } = useRouter();

  let isActive = false;
  if (asPath === href) {
    isActive = true;
  }

  return (
    <Link href={href}>
      {React.cloneElement(children, {
        style: {
          fontWeight: isActive ? "bold" : "normal",
          borderBottom: isActive ? "2px solid" : "none"
        },
      })}
    </Link>
  );
};

ActiveLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default ActiveLink;
