


export const Success =(props)=>{
    {
        if(props.showpopup){
            setTimeout(()=>{

             props.setshowpopup(false)
             props.setshowSuccess(false)

            },9000)
        }
    }
    return (
        <div
          className={` animate-popup z-999 fixed bottom-4 right-4 bg-yellow-400 text-white text-lg py-1 px-4   flex items-center `}
        >
          <i className="bi bi-check-circle-fill mr-2"></i>
          <span>{`${props.popupmessage}`}</span>
        </div>
      );
    };


    export const Error =(props)=>{
        {
            if(props.showpopup){
                setTimeout(()=>{
                    
                 props.setshowpopup(false)
                 props.setshowError(false)
    
                },9000)
            }
        }
        return (
            <div
              className={` z-999 fixed bottom-4 right-4 bg-red-700 text-white text-lg py-2 px-4  flex items-center `}
            >
              <i class="bi pr-1 bi-exclamation-circle-fill"></i>
               <span>{`${props.popupmessage}`}</span>
            </div>
          );
        };
    