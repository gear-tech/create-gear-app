import React, { useEffect, useState } from 'react';
import { useUser } from '../../context/UserContext';
import { ApiRequestService } from '../../service/ApiRequestService';
import { Ripple } from '../Ripple/Ripple';
import './Claim.scss';

type Accout = {
  id: string;
  tokens: number;
  claimed: boolean;
  atBlock: string | null;
};

export const Claim = () => {
  const { currentAccount } = useUser();
  const [accountExist, setAccountExist] = useState<boolean>(true);
  const [claimDetails, setClaimDetails] = useState<Accout | null>(null);
  const [startClaim, setStartClaim] = useState<boolean>(false);
  const [isInBlock, setIsInBlock] = useState<boolean>(false);

  useEffect(() => {
    const checkClaim = async () => {
      try {
        const account = await ApiRequestService('check', {
          id: currentAccount!.address,
        });

        if (account.error) {
          setAccountExist(false);
        }

        if (account.id) {
          setAccountExist(true);
          setClaimDetails(account);
          console.log(account);
        }
      } catch (err) {
        console.log(err);
        setAccountExist(false);
      }
    };

    if (currentAccount !== null) {
      checkClaim();
    }
  }, [currentAccount]);

  const claimBonuses = async () => {
    setStartClaim(true);
    const response = await ApiRequestService('claim', {
      id: currentAccount!.address,
    });

    if (response.status === 'inBlock') {
      setIsInBlock(true);
    }
  };

  return (
    <header>
      {(accountExist && (
        <>
          {claimDetails?.claimed ? (
            <>
              <p>Your GRB bonuses already claimed at block:</p>

              <a
                className="claim__block-hash"
                href={`https://statemine.subscan.io/block/${claimDetails?.atBlock}`}
              >
                {claimDetails?.atBlock}
              </a>
            </>
          ) : (
            <>
              <p>Available bonuses to claim:</p>
              <h2>{claimDetails?.tokens} GRB</h2>

              {startClaim ? (
                <>
                  {isInBlock ? (
                    <div>
                      <p>In Block</p>
                      <a
                        className="claim__block-hash"
                        href={`https://statemine.subscan.io/block/${claimDetails?.atBlock}`}
                      >
                        {claimDetails?.atBlock}
                      </a>
                    </div>
                  ) : (
                    <div className="claim__trx-loader">
                      <Ripple color="#2bd071" />
                      <p>Processing transaction</p>
                    </div>
                  )}
                </>
              ) : (
                <div className="btn-line">
                  <button className="btn btn-success" onClick={claimBonuses}>
                    Claim Bonuses
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )) || <h2>Claim not Found :(</h2>}
    </header>
  );
};
