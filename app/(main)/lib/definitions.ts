{/* REPLACE THIS WITH RELEVANT DATA STRUCTURES */}

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Profile = {
  id: string;
  aboutMe: string;
  clientTypes: (boolean | number | null )[];
  neighborhood: string[];
};

export type Photos = {
    id: string;
    profPhoto: string;
    galleryPhotos: string[];
};