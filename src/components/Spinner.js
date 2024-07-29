import loading from './loading.gif'
function Spinner(){
    return (
      <div className='text-center align-self-center'>
        <img src={loading} alt=""  width="60px"/>
      </div>
    )
}

export default Spinner
