window.slider.once('onStoreDataLoaded', (evt) => {
  console.log('event: onStoreDataLoaded');
  const storeData = evt.detail;
  if (!storeData) {
    return;
  }

  const appendData = {
    hello: 'from script'
  }

  storeData.appendData = appendData;
});

window.slider.once('onSchemaInitial', () => {
  console.log("event: onSchemaInitial");
})

window.slider.once('onLoaded', () => {
  console.log("event: onLoaded");
})

// window.slider.throwError(new Error('asdadasd'));
