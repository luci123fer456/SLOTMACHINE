//1. get the deposit
//2. get the bet per line
//3. get the number of lines betting
//4. reel the weels
//5. check if won anything
//6. give the prize and prompt to play again

const prompt=require("prompt-sync")();
const ROWS=3
const COLS=3
const SYMBOLS_COUNT={
    A:2,
    B:4,
    C:6,
    D:8
}
const SYMBOLS_VALUE={
    A:5,
    B:4,
    C:3,
    D:2
    
}

const getdeposit=() =>
    {   while(true){
        const deposit=prompt("Enter the Deposit amount: $ ");
        const depositamount=parseFloat(deposit)
        if(isNaN(depositamount) || depositamount<0)
            {
                console.log("Enter a valid amount");
            }
        else
        {
            return depositamount;
            
        }    
    }
}
const get_line=() =>
    {
        while(true){
            const line=prompt("Enter the number of lines to bet on: ");
            const linetobet=parseFloat(line)
            if(isNaN(linetobet) || linetobet<1 || linetobet>3)
                {
                    console.log("Enter valid number of lines ");
                }
            else
            {
                return linetobet;
                
            }    
        }

    }
const get_bet=(linetobet,balance) =>
    {
        while(true){
            const bet=prompt("Enter the Bet amount per line : $ ");
            const betamount=parseFloat(bet)
            if(isNaN(betamount) || betamount<0 || betamount>balance/linetobet)
                {   console.log(balance,linetobet)
                    console.log("Enter a valid amount");
                }
            else
            {
                return betamount;
                break;
            }    
        }

    }
const spin=() =>{
    const symbols=[]
    for (const [symbol,count] of Object.entries(SYMBOLS_COUNT))
    {
        for (let i=0;i<count;i++)
            {
                symbols.push(symbol)
            }
    
    }
    const reels=[]
    for (let i=0;i<COLS;i++)
        {
            reels.push([])
            const allsymbols=[...symbols]
            
            for (let j=0;j<ROWS;j++)
                {
                    const randomIndex=Math.floor(Math.random()*allsymbols.length)
                    reels[i].push(allsymbols[randomIndex])
                    allsymbols.splice(randomIndex,1)
                    


                }

        }
    return reels;


}
const transpose=(reels) =>
{

    const rows =[]
    for (let i=0;i<ROWS;i++)
        {
            rows.push([])
            for (let j=0;j<COLS;j++)
                {
                    rows[i].push(reels[j][i])
                }

        }
        for (const row of rows)
            {   symstring="";
                for (const[i,symbol] of row.entries())
                    {
                        
                        symstring+=symbol;
                        if(i!=row.length-1)
                            {
                                symstring+=" | ";
                            }

                    }
                    console.log(symstring)
            } 
               
    return rows; 

}
const getwinnig=(betamount,linetobet,rows) =>
    {
        console.log()
        let winning=0;
        for (const row of rows){
            const symbols=row;
            
            let allTrue=true;
            for (symbol of symbols)
                { 
                    if(symbol !=symbols[0])
                        { 
                            allTrue=false
                        }
                }
            if(allTrue==true)
                {  
                    winning+=SYMBOLS_VALUE[symbols[0]]*betamount
                }    
        }
        return winning;
    }

 const game =()=>{   
let balance=getdeposit();
while(true){
console.log("Your Balance is :$"+balance)
const linetobet=get_line();
const betamount=get_bet(linetobet,balance)
balance-=(betamount*linetobet)
const reels=spin();
const rows=transpose(reels);
const winnings=getwinnig(betamount,linetobet,rows)
balance+=winnings
console.log("You won $"+winnings)
if(balance<=0)
    {
        console.log("YOU RAN OUT OF BALANCE :(");
        break;
    }
const dec=prompt("Do you want to continue?(Y/N): ");
if(dec!='Y' && dec!='y')
    {
        break;
    }    
}


 }

 game()
