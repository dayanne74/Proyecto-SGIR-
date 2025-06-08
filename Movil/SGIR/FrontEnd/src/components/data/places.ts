export interface Place {
    id: string;
    name: string;
    description: string;
    image: any;
  }
  
  export const places: Place[] = [
    {
      id: '1',
      name: 'Cartagena',
      description: 'Una hermosa ciudad amurallada con playas y cultura.',
      image: require('../../../assets/colombia.jpg'),
    },
    {
      id: '2',
      name: 'Medellín',
      description: 'La ciudad de la eterna primavera.',
      image: require('../../../assets/Medellin.jpg'),
    },
    // Agrega más lugares...
  ];