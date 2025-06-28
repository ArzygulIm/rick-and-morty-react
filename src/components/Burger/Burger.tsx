import React from 'react'
import styles from './Burger.module.css';
import exp from 'constants';

interface BurgerProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Burger: React.FC<BurgerProps> = ({ isOpen, onToggle }) => {

    const handleClick = () => {
        const burger = document.querySelector(`.${styles['burger']}`);
        if (burger) {
            burger.classList.toggle(styles['active']);
        }
        onToggle();
    }
  return (
    <div className={`${styles['burger-wrapper']}`}>
      <div className={`${styles['burger']}`} onClick={handleClick}></div>
    </div>
  )
}

export default Burger;