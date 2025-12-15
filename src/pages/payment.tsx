import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { PaymentState } from './book_room';
import Navbar from '@src/pages/components/navbar';
import PageTitle from '@src/pages/components/page_title';
import CenteredBody from '@src/pages/components/centered_body';
import { Input, FormFieldsHolder } from '@src/pages/components/form_elems';
import { PrimaryBtn, SecBtn, FormBtnPair } from '@src/pages/components/form_btns';
import type { Wallet } from '@src/main';

// Importing stylessheet
import '@src/assets/styles/add_balance.css';

interface AddBalanceProps {
    amount: number;
    paymentState: PaymentState;
}

export default function Payment(props: AddBalanceProps) {
    const nav = useNavigate();

    const [amount, setAmount] = useState(props.amount);
    const [cardNumber, setCardNumber] = useState<number | null>(null);
    const [cardHolderName, setCardHolderName] = useState('');
    const [cvc, setCvc] = useState(0);

    const processRequest = () => {
        // Validating fields
        if (!cardNumber || isNaN(cardNumber) || cardNumber.toString().length < 4) {
            alert("The card number must be greater than 4 digits!");
            return;
        }
        else if (cardHolderName.trim() === '') {
            alert("Card holder name can't not be empty");
            return;
        }
        else if (isNaN(cvc) || cvc.toString().length !== 3) {
            alert("CVC must be a 3 digit number");
            return;
        }
        else if (isNaN(amount) || amount < 1) {
            alert("Amount cannot be zero!");
            return;
        }

        // Now validating payment process
        props.paymentState.set((prev) => {
            prev!.status = 'SUCCESS';
            return {...prev!};
        })
    }

    return (
        <>
            <CenteredBody maxWidth={700}>
                <PageTitle text={'Card Payment'} parentPath={'/account'} />
                <FormFieldsHolder>
                    <Input
                        id={'amount'} title={'Amount'}
                        placeholder={'Total cost in $'}
                        type={'number'}
                        onInput={() => {
                            setAmount(props.amount); // Forcing not to change the amount value by user actions
                        }}
                        value={amount.toString()}
                        required={true}
                    />
                    <Input
                        id={'cardNumber'} title={'Card Number'}
                        placeholder={'Enter your card number here'}
                        type={'number'}
                        onInput={(e) => {
                            setCardNumber(parseInt((e.target as HTMLInputElement).value));
                        }}
                        required={true}
                    />
                    <Input
                        id={'cardHolderName'} title={'Card Holder Name'}
                        placeholder={'Enter card holder name here'}
                        onInput={(e) => {
                            setCardHolderName((e.target as HTMLInputElement).value);
                        }}
                        required={true}
                    />
                    <Input
                        id={'cvc'} title={'CVC'}
                        placeholder={'Enter card cvc here'}
                        onInput={(e) => {
                            setCvc(parseInt((e.target as HTMLInputElement).value));
                        }}
                        required={true}
                    />
                </FormFieldsHolder>
                <FormBtnPair>
                    <PrimaryBtn onClick={processRequest}>Proceed</PrimaryBtn>
                    <SecBtn onClick={() => { nav('/account'); }}>Cancel</SecBtn>
                </FormBtnPair>
            </CenteredBody>

        </>
    )
}