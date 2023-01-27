window.onload=()=>{
    console.log('loaded');
    chrome.runtime.onMessage.addListener((mes, sender , response)=>{
        let value =parseInt(mes.Value)
        console.log('value');
        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        
        async function captureNFTs(numOfNFTs)
        {
            //Total NFTs Listed
            let doc=document.querySelectorAll('div[class="tw-grid tw-grid-cols-2 sm:tw-grid-cols-[250px,250px] tw-gap-3"]')[0]
            let listed_NFTs=doc.querySelectorAll('.tw-bg-gray-200')[1].innerText;
            console.log(listed_NFTs);
            
            // let listed_NFTs=document.querySelectorAll("span[class='tw-text-white-1 tw-text-14px tw-truncate']")[1].innerText
            listed_NFTs=listed_NFTs.match(/\d+/)[0];
            console.log('Total NFTs present on a page:'+listed_NFTs)
            let oneIteration=10
            let start=0
            //Outer Loop
            for(let i=0;i<numOfNFTs;i++)
            {
                //Inner Loop 
                for(let j=start;j<oneIteration;j++)
                {   
                    try
                    {
                        let NFT_Image=(document.querySelectorAll('.card-img-top')[j].src).replace('/rs:fill:400:400:0:0','')
                        let HowRareRank=''
                        let HowRareRankLink=''
                        let cards=document.querySelectorAll('.grid-card__main')
                        try
                        {
                        
                            HowRareRank=cards[j].querySelector('a.tw-text-xs').textContent
                            HowRareRankLink=cards[j].querySelector('a.tw-text-xs').href
                        } 
                        catch(err)
                        {
                            HowRareRank="N/A"
                            HowRareRankLink="N/A"
        
                        }
        
                        let MERarityRank=(document.querySelectorAll("label.tw-text-xs")[j].textContent)
                        let NFT_title=(document.querySelectorAll(".grid-card__title")[j].textContent)
                        let price=(document.querySelectorAll("div.tw-flex>span.tw-truncate")[j].textContent)
                        let detailsLink=(document.querySelectorAll("a.tw-text-sm")[j].href)
                        let border=document.querySelectorAll(".grid-card__main")[j]
                        border.style.border= "3px solid cyan";
        
                        let	NFT={
                            NFT_Title:nft_title(NFT_title)||'N/A',
                            How_Rare_Rank:HowRareRank||'N/A',
                            HRR_Link:HowRareRankLink||'N/A',
                            ME_Rarity_Rank:MERarityRank||'N/A',
                            "Price(SOL)":price||'N/A',
                            Details:detailsLink||'N/A',
                            Image:NFT_Image||'N/A'
                        }
        
                        NFTs.push(NFT)
        
                        //Stops inner loop
                        if(NFTs.length==numOfNFTs){
                            console.log('Total NFTs scraped:'+NFTs.length)
                            break
                    
                        }
                        if(NFTs.length==(listed_NFTs-1))
                        { 
                            console.log('NFTs are ended!')
                            break;
                        }
                    }
                    catch(err)
                    {
                        console.log(err)
                    }
                    // console.log("NFTs scraped:"+NFTs.length+"/"+numOfNFTs)   
                    await sleep(200)
                }
            
            //Stops outer loop
            if(NFTs.length==numOfNFTs)
            {
                console.log('Total NFTs scraped:'+NFTs.length)
                break
        
            }
            if(NFTs.length==(listed_NFTs-1))
                { 
                    console.log('NFTs are ended!')
                    break;
                }
            console.log("NFTs scraped:"+NFTs.length+"/"+numOfNFTs)   
            window.scrollBy(0,1500)
            oneIteration=(10+oneIteration);
            start=(10+start) 
            }
           console.log(NFTs)
           download()
        } 
        
        
        function download()
        {  
            console.log("Download section:"+NFTs)
            let nft=''
            try{
                 nft= Papa.unparse(NFTs)
            }
            catch(err){
                alert("Error:"+err)
            }
            
            let csvContent = "data:text/csv;charset=utf-8,";
                csvContent += nft
        
        
        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download",  `${fileName()}.csv`);
        document.body.appendChild(link);
        
        link.click(); // This will download the CSV file
        
        }
        
        function fileName(){
            let tab=window.location.href
            tab=tab.split('/')
            tab=tab.pop()
            return tab
        }
        function nft_title(title){
            let str=title
            str=str.split("#")
            str=str.join('')
            return str
        }   
        
        
        let NFTs=[]
        let num_of_NFTs=value;
        captureNFTs(num_of_NFTs)
    
    })
}