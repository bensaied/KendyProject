import React, { useState } from "react";
import {
  // CAvatar,
  // CBadge,
  CDropdown,
  // CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CHeaderNav,
  CNavItem,
} from "@coreui/react";
import {
  // cilBell,
  // cilCreditCard,
  // cilCommentSquare,
  // cilEnvelopeOpen,
  // cilFile,
  // cilLockLocked,
  // cilSettings,
  // cilTask,
  // cilUser,
  cilLoopCircular,
} from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { FaUserCog, FaUserEdit } from "react-icons/fa";
import { HiUser } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import { currentType } from "src/views/actions/userActions";

const AppswichDropDown = () => {
  const navItemBoxStyle = {
    border: "1px solid #ccc",
    padding: "7px",
    backgroundColor: "#f5f5f5",
  };
  const currentTypeState = useSelector((state) => state.currentType);
  const [selectedUserType, setSelectedUserType] = useState(
    currentTypeState.currentType
  );
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const dispatch = useDispatch();

  const handleUserTypeSelect = (selectedType) => {
    setSelectedUserType(selectedType);
    dispatch(currentType(selectedType));
    window.location.reload(); // Reload the window
  };

  return (
    <div>
      <style>
        {`
          .selected {
            background-color: lightgrey;
          }
        `}
      </style>

      <CHeaderNav>
        <div style={{ display: "flex", alignItems: "center" }}>
          <CNavItem>
            <CDropdown variant="nav-item">
              <CDropdownToggle caret={false}>
                <div style={navItemBoxStyle}>
                  <span style={{ marginRight: "7px" }}>
                    <CIcon icon={cilLoopCircular} size="lg" />
                  </span>
                  {currentTypeState.currentType}
                </div>
              </CDropdownToggle>

              {/* OLD CDROPMENU LOGIC */}
              {/* <CDropdownMenu className="pt-0" placement="bottom-end">
          <CDropdownHeader className="bg-light fw-semibold py-2">
            Connectez en tant que:
          </CDropdownHeader>
          {userInfo.userType?.map((type) => (
            <CDropdownItem
              key={type}
              onClick={() => handleUserTypeSelect(type)}
              className={selectedUserType === type ? 'selected' : ''}
            >
              {type}
            </CDropdownItem>
          ))}
        </CDropdownMenu> */}

              <CDropdownMenu className="pt-0" placement="bottom-end">
                <CDropdownHeader className="bg-light fw-semibold py-2">
                  Connectez en tant que:
                </CDropdownHeader>
                {userInfo &&
                userInfo.userType &&
                userInfo.userType.length > 0 ? (
                  userInfo.userType.map((type) => (
                    <CDropdownItem
                      key={type}
                      onClick={() => handleUserTypeSelect(type)}
                      className={selectedUserType === type ? "selected" : ""}
                    >
                      {type}
                    </CDropdownItem>
                  ))
                ) : (
                  <CDropdownItem disabled>
                    No user types available
                  </CDropdownItem>
                )}
              </CDropdownMenu>
            </CDropdown>
          </CNavItem>
        </div>
      </CHeaderNav>
    </div>
  );
};

export default AppswichDropDown;

// THIS LOGIC IS USEFUL WHEN THERE IS A TROUBLE WITH APPHEADER SWICHTYPE AND NOTIFICATIONS, IT IS A FLUID CONTAINER
{
  /* <CHeaderNav>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilBell} size="lg" />
            </CNavLink>
          </CNavItem>

          {showComponent ? <AppswichDropDown /> : ""}
        </CHeaderNav> */
}
