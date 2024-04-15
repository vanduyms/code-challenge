interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}
interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

const getPriority = (blockchain: string): number => {
  const priorities: { [key: string]: number } = {
    Osmosis: 100,
    Ethereum: 50,
    Arbitrum: 30,
    Zilliqa: 20,
    Neo: 20,
  };
  return priorities[blockchain] || -99;
};

// Custom hook to sort and format amount of ballance
function useSortedWalletBalances(): FormattedWalletBalance[] {
  const balances = useWalletBalances();

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        return balancePriority > -99 && balance.amount <= 0;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        return rightPriority - leftPriority;
      })
      .map((balance: WalletBalance) => {
        return {
          ...balance,
          formatted: balance.amount.toFixed(),
        } as FormattedWalletBalance;
      });
  }, [balances]);

  return sortedBalances;
}

// Component row for a wallet
const WalletRowComponent: React.FC<
  FormattedWalletBalance & { usdValue: number }
> = ({ amount, formatted, ...props }) => {
  return <WalletRow amount={amount} formattedAmount={formatted} {...props} />;
};

const WalletPage: React.FC<Props> = ({ ...rest }) => {
  const sortedBalances = useSortedWalletBalances();
  const prices = usePrices();

  const rows = useMemo(() => {
    return sortedBalances.map(
      (balance: FormattedWalletBalance, index: number) => {
        const usdValueCalculated = prices[balance.currency] * balance.amount;
        return (
          <WalletRowComponent
            key={`${balance.currency}_${index}`}
            usdValue={usdValueCalculated}
            {...balance}
          />
        );
      }
    );
  }, [sortedBalances, prices]);

  return <div {...rest}>{rows}</div>;
};
