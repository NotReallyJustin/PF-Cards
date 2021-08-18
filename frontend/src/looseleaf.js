import './css/brief.css';
import Paper from './paper.js';

export default function Looseleaf()
{
    return (
        <div class='aboutWrapper'>
            <Paper editable='false'
            className='paperAlone lines txt looseleaf'
            content={
                <div>
                    <div className='hole1'></div>
                    <div className='hole2'></div>
                    <div className='hole3'></div>
                    <br />
                    <b>PF Debate Cards</b> <br /><br />

                    Not all debate prep is created equal - summer camps, private coaches, and access to prep groups give debaters a significant
                    edge over other less privileged debaters. To solve this issue, the Debate Wiki was founded to promote disclosure, enhance education,
                    and level the playing field. <br /> <br />

                    However as of now, Card Finders have largely been restricted to Policy/LD Debate. This site hopes to expand the functionality to the PF Debate Space as well.
                    This site should be regularly updated on a weekly basis with new evidence.<br /> <br />

                    Another major source of evidence gatekeeping are expensive Debate Briefs that are available for sale. As PF topics rotate monthly, these briefs give
                    a significant advantage to those who could afford to pay and read up on the topic analysis. This site hopes to open source them for the public to download
                    and use. If you have any briefs you would like to share in addition to the existing collection, feel free to email pfcards2@gmail.com
                </div>
            }
            >
            </Paper>
        </div>
    )
}