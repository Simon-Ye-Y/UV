import React, { useState } from 'react';
import styles from './Navbar.module.css';
import Link from "next/link";
import Image from 'next/image';
export default function Navbar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    //
    // const toggleDropdown = () => {
    //     setIsDropdownOpen(!isDropdownOpen); // 切换下拉菜单状态
    // };
    const handleMouseEnter = () => {
        setIsDropdownOpen(true); // 鼠标悬浮时打开
    };

    const handleMouseLeave = () => {
        setTimeout(() => {
            setIsDropdownOpen(false); // 延迟关闭下拉菜单
        }, 500); // 延迟 300 毫秒，可以根据需要调整时间
    };

    return (
        <>
            {/* 全局样式引入 */}
            <div className="navbar-2 w-nav">
                <div className="container w-container">
                    <div className="nav-wrapper">
                        {/* Logo */}
                        <Link href="/">
                            <Image
                                className={styles.logo1}
                                src="/images/logo1.png"
                                alt="Logo"
                                width={160}
                                height={60}
                            />
                        </Link>
                        {/* Navigation Menu */}
                        <nav role="navigation" className="nav-menu w-nav-menu">
                            <Link href="/" className="nav-link w-nav-link">Home</Link>

                            {/* Dropdown */}
                            <div className="dropdown w-dropdown"
                                 onMouseLeave={handleMouseLeave}
                            >
                                <div
                                    className="dropdown-toggle w-dropdown-toggle"
                                    // onClick={toggleDropdown}
                                    onMouseEnter={handleMouseEnter}

                                >
                                    <div className="dropdown-text">Pages</div>
                                    <div className="dropdown-arrow">▼</div>
                                </div>
                                {isDropdownOpen && (
                                    <div className="dropdown-list w-dropdown-list">
                                        <div className="dropdown-list-pd">
                                            {/* Pages Section */}
                                            <div className="dropdown-list-wrap">
                                                {/*<h6 className="pages-main-title">Pages</h6>*/}
                                                <Link href="/courses" className="dropdown-link w-dropdown-link">Courses</Link>
                                                <span className="dropdown-link w-dropdown-link">Library & Dining</span>
                                                <span className="dropdown-link w-dropdown-link">Map</span>
                                                <Link href="/AI" className="dropdown-link w-dropdown-link">AI Assistant</Link>
                                                <Link href="/dining" className="dropdown-link w-dropdown-link">Dining</Link>
                                                <Link href="/library" className="dropdown-link w-dropdown-link">Library</Link>
                                                <Link href="/map" className="dropdown-link w-dropdown-link">Mapping</Link>
                                                <Link href="/forum" className="dropdown-link w-dropdown-link">Forum</Link>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </nav>

                        {/* Login Button */}
                        <div className="nav-button-wrap">

                            {isLoggedIn ? (
                                // 如果已登录，显示 Profile 按钮
                                <Link href="/profile" className="primary-button-wrapper primary-button-arrow">
                                    Profile
                                </Link>
                            ) : (
                                // 如果未登录，显示登录按钮
                                <Link href="/login" className="primary-button-wrapper primary-button-arrow">
                                    Log in
                                </Link>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
