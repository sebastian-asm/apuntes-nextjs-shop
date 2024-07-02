export const generatePaginationNumber = (currentPage: number, totalPages: number) => {
  // Si el número total de páginas es 7 o menos
  // se mostrarán todas las páginas sin puntos suspensivos
  if (totalPages < 7) return Array.from({ length: totalPages }, (_, i) => i + 1) // [1,2,3,4,5,6,7]
  // Si la página actual está entre las primeras 3
  // se mostrará las primeras 3, puntos suspensivos y las últimas 2
  if (currentPage <= 3) return [1, 2, 3, '...', totalPages - 1, totalPages] // [1,2,3,'...',9,10]
  // Si la página actual está entre las últimas 3
  // se mostrará las primeras 2, puntos suspensivos y las últimas 3
  if (currentPage >= totalPages - 2) return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages] // [1,2,'...',8,9,10]
  // Si la página actual está en algún del medio
  return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages] // [1,'...',4,5,6,'...',10]
}
