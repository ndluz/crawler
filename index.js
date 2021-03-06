const puppeteer =  require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false});
  const page = await browser.newPage();
  await page.goto('http://receitasdeminuto.com/categoria/receitas/lanches/');
  
  await page.evaluate(() => {
    const nodeList = document.querySelectorAll('h2 a');
    const postsArray = [...nodeList]
    const list  = postsArray.map( a => ({
      href: a.href
    }))
    
    console.log(list)
   

  })

  // await browser.close();
})();