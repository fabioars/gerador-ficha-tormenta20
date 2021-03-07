import React from 'react';

import Typography from '@material-ui/core/Typography';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Link from '@material-ui/core/Link';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  link: {
    color: '#FAFAFA'
  },
}));

const Sidebar = ({visible, onCloseSidebar}) => {
  const styles = {
    sidebar: {
      position: 'absolute',
      background: 'rgba(0,0,0,0.95)',
      top: '0',
      width: '300px',
      height: '97.9vh',
      zIndex: '1',
      boxShadow: '5px 0px 5px 0px rgba(0,0,0,0.75)',
      color: '#FAFAFA',
      display: visible ? 'block' : 'none',
      paddingTop: '20px',
      transition: 'width 20s',
    },
    closeIcon: {
      textAlign: 'right',
      paddingRight: '15px'
    },
  };
  
  const classes = useStyles();

  return (
    <div style={styles.sidebar}>
      <div style={styles.closeIcon}>
        <Typography style={{cursor: 'pointer'}} onClick={onCloseSidebar} variant="inherit">X</Typography>
      </div>
      <MenuList>
        <MenuItem>
          <Typography variant="inherit">
            <Link className={classes.link} href="https://github.com/YuriAlessandro/gerador-ficha-tormenta20/discussions/new">Sugestões, Ideias e Feedbacks</Link>
          </Typography>
        </MenuItem>
        <MenuItem>
          <Typography variant="inherit">
            <Link className={classes.link} href="https://github.com/YuriAlessandro/gerador-ficha-tormenta20">Contribua com o Projeto</Link>
          </Typography>
        </MenuItem>
      </MenuList>
    </div>
  )
}

export default Sidebar;