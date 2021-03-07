const puppeteer =  require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false});
  const page = await browser.newPage();
  await page.goto('http://receitasdeminuto.com/categoria/receitas/lanches/');
  
  const paginas = await page.evaluate(() => {
    const nodeList = document.querySelectorAll('h2 a');
    const postsArray = [...nodeList]
    const list  = postsArray.map( a => ({
      href: a.href
    }))
    
    return list
  })
  console.log(paginas)
  
  const receitas = []

  for(let i = 0; i<paginas.length; i++){

    await page.goto(paginas[i].href);

    const pedaco = await page.evaluate(() => {

      const nodeList = document.getElementsByClassName('postContent');

      const conteudoReceita = [...nodeList];
      
      const receita = {
        img: conteudoReceita[0].children[10].currentSrc       
      }
      return receita
    })

    receitas.push(pedaco)
    console.log(receitas)
  }

  console.log(receitas);

  // await browser.close();
})();