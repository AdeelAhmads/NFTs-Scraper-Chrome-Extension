document.getElementById('submit').addEventListener('click',function(){
    chrome.tabs.query({currentWindow:true,active:true}, async function(tabs){
     
         let numOfNFTs=document.getElementById('inputValue').value
         console.log(numOfNFTs)
         console.log(numOfNFTs.length)

                      var activeTab=tabs[0]
            let pass=weblink(tabs[0].url)
            if(pass)
            {
               if(numOfNFTs.length!=0){
                    chrome.tabs.sendMessage(activeTab.id,{Value:numOfNFTs})
                  }
               else{
                     document.querySelector('.msg2').style.display='block'
                  }  
            }
            else{
               document.querySelector('.msg').style.display='block'
            }
            
    });
});
function weblink(link)
{   
    const str1 = link
    let test1=str1.includes('magiceden.io/marketplace');
    if(test1){
     return true
    }
    else{
     return false
    }
}
