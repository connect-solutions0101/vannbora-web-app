import React from "react";
import styles from "./Breadcrumb.module.css";
import classNames from "classnames";

const Breadcrumb = ({ items }) => {
    

    return (
        <div className={styles["breadcrumb"]}>
        {items.map((item, index) => {
            let itemClass = item.state === "completed" ? styles["completed"] : styles["uncompleted"];
            let itemClasses = classNames(styles["item"], itemClass);

            return (
                <div className={itemClasses}>
                    <div key={index} className={styles.elipse} onClick={item.onClick}>
                        {item.icon}
                    </div>
                    <span>
                        {item.label}
                    </span>
                    {/* {index < items.length - 1 && <div className={styles.line}></div>} */}
                </div>
            );
        })}
        </div>
    );
    };

export default Breadcrumb;