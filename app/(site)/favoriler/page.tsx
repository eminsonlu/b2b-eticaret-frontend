import FavoritesContainer from '@/containers/site/FavoritesContainer';
import React from 'react';

export const revalidate = 0;

export const generateMetadata = async () => {
  return {
    title: 'Favorilerim',
  };
};

const FavoritesPage = async () => {
  return <FavoritesContainer />;
};

export default FavoritesPage;
