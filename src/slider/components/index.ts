export async function loadAllComponents() {
  return Promise.all([
    import('./containers'),
    import('./effects'),
    import('./effects'),
    import('./elements'),
    import('./widgets'),
    import('./charts')
  ]);  
}




