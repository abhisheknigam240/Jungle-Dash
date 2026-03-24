export default function Over({ handlePlay }) {
    return (
        <div>
            <p className="over">GAME OVER</p>
            <p className="desc">Thank you for playing! :)</p>
            <button className='playAgain' onClick={handlePlay}>Play Again</button>
        </div>
    );
}