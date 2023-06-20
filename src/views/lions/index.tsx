import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import './lions.css';
import BackButton from '../../components/back-button';
import { getTxt } from '../../texts/texts';
import { UserDataContext } from '../../App';

export default function LiberatorsView() {
  const history = useHistory();
  const [liberators, setLiberators] = useState([{ a: '', b: '' }]);
  const [showLoading, setShowLoading] = useState(true);

  const { userData } = useContext(UserDataContext);

  useEffect(() => {
    const DOC_KEY = '1kNhe5FoWxqTmiyahznDYN7FqmY_mN8vjQQmtvSafNtg';
    axios
      .get(
        `https://docs.google.com/feeds/download/spreadsheets/Export?key=${DOC_KEY}&exportFormat=csv&gid=0`,
      )
      .then((res) => {
        const rows = res.data.split('\r\n');
        const parsedRows = rows.map((r: string) => {
          const dataRow = r.split(',');

          return {
            a: dataRow[0],
            b: dataRow[1],
          };
        });

        setLiberators(parsedRows);
        setShowLoading(false);
      });
  }, []);

  if (userData === null || userData.language === null) {
    // Not loaded yet.
    return null;
  }

  return (
    <div className="dialog">
      <div className="header">
        <h1 className="lions-title">
          {getTxt(userData.language, 'lions-title')}
        </h1>

        <div className="back-button-container-lions">
          <BackButton
            className="back-button-lions"
            onClick={() => {
              history.push('/main-menu');
            }}
          />
        </div>
      </div>

      <p className="lions-subtitle">
        {getTxt(userData.language, 'lions-description')}
      </p>

      {showLoading ? <h2>{getTxt(userData.language, 'loading')}...</h2> : null}

      <div className="lions-container">
        {liberators.map((l, i) => {
          const donationLevel = parseInt(l.b);

          let donationLevelClassName;
          if (isNaN(donationLevel)) {
            // Monthly
            donationLevelClassName = 'diamond';
          } else if (donationLevel >= 10) {
            donationLevelClassName = 'gold';
          } else if (donationLevel >= 5) {
            donationLevelClassName = 'silver';
          } else {
            donationLevelClassName = 'bronze';
          }

          return (
            <p
              key={i}
              className={`lion-and-donation ${donationLevelClassName}`}
            >
              <span className="lion-name">{l.a.toUpperCase()}</span>
              <span className="lion-donations">{l.b.toUpperCase()}</span>
            </p>
          );
        })}
      </div>
    </div>
  );
}
