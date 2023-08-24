import { Box, Breadcrumbs, Fab, Typography, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import bgImage from '@/assets/images/fantasybg.png';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import SheetBuilderForm from '../SheetBuilder/SheetBuilderForm/SheetBuilderForm';
import SheetPreview from '../SheetBuilder/SheetPreview/SheetPreview';
import { setActiveSheet } from '../../store/slices/sheetStorage/sheetStorage';

const SheetBuilderPage: React.FC = () => {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setActiveSheet(id));
  }, [id]);

  const isDarkTheme = theme.palette.mode === 'dark';

  const handleChange = (newValue: number) => {
    setValue(newValue);
  };

  const Title = styled.h1`
    font-family: 'Tfont';
    color: ${theme.palette.primary.main};
  `;

  const FabDiv = styled.div`
    margin: 0px;
    top: auto;
    right: 20px;
    bottom: 20px;
    left: auto;
    position: fixed;
    z-index: 10;
  `;

  const BackgroundBox = styled(Box)`
    background: linear-gradient(
        to top,
        rgba(255, 255, 255, 0) 20%,
        ${isDarkTheme ? '#212121' : '#f3f2f1'}
      ),
      url(${bgImage});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  `;

  return (
    <>
      <FabDiv>
        {value === 0 && (
          <Fab color='primary' variant='extended' onClick={() => setValue(1)}>
            <EditIcon sx={{ mr: 1 }} />
            Editar Ficha
          </Fab>
        )}
        {value === 1 && (
          <Fab color='primary' variant='extended' onClick={() => setValue(0)}>
            <VisibilityIcon sx={{ mr: 1 }} />
            Visualizar Ficha
          </Fab>
        )}
      </FabDiv>
      <BackgroundBox sx={{ display: value === 0 ? 'block' : 'none' }}>
        <Breadcrumbs aria-label='breadcrumb' sx={{ p: 2 }}>
          <Link to='/sheets' color='inherit' href='/sheets'>
            Meus Personagens
          </Link>
          <Typography color='text.primary'>Gerenciar Personagem</Typography>
        </Breadcrumbs>

        <Box sx={{ p: 5 }}>
          <Title>Visualizar Ficha</Title>
        </Box>
        <SheetPreview handleChange={handleChange} />
      </BackgroundBox>
      <Box sx={{ display: value === 1 ? 'block' : 'none' }}>
        <Box sx={{ p: 5 }}>
          <Title>Editar Ficha</Title>
        </Box>
        <SheetBuilderForm
          onFinishBuild={() => {
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            });
            setValue(0);
          }}
        />
      </Box>
    </>
  );
};
export default SheetBuilderPage;
