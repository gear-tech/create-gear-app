import React, { useState } from 'react';
import clsx from 'clsx';
import './Accordion.scss';

export const Accordion = () => {
  const [clicked, setClicked] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    if (clicked === index) {
      return setClicked(null);
    }

    setClicked(index);
  };

  const data = [
    {
      title: 'What is GRB?',
      content: `GRB is Gear’s Bonus Reward which can later be exchanged for native Gear tokens.`,
    },
    {
      title: 'How can I earn GRB?',
      content: `To earn GRB you have to take part in the activities that we are organizing on a regular basis, like workshops and live AMAs. Please note, not all participants will be awarded with GRB. To earn GRB you have to successfully take part in various tasks, for example deploying a dApp in one of our workshops. In case of online AMAs, we reward those who come up with the most interesting questions.
      We are always posting information about upcoming events on <a href="https://gear-tech.io/" target="_blank">our webpage</a> and <a href="https://twitter.com/gear_techs" target="_blank">twitter</a>.`,
    },
    {
      title: 'How can I claim GRB?',
      content: `To claim your GRB reward, first you have to download polkadot.js extension and create a Substrate account.`,
    },
    {
      title: 'How do I create a Substrate account?',
      content: `You can read an in depth post about how to create a substrate account <a href="https://wiki.gear-tech.io/quick-guides/create-account" target="_blank">here</a>.`,
    },
    {
      title: 'How do I check my GRB balance?',
      content: `If you want to check if you received your GRB reward please check the link below and follow the instructions.
      <p><a href="https://wiki.gear-tech.io/quick-guides/gear-bonus/" target="_blank">https://wiki.gear-tech.io/quick-guides/gear-bonus/</a></p>`,
    },
  ];

  const faqItem = data.map((item, index) => (
    <div className={clsx('faq-item', clicked === index && 'open')} key={index}>
      <div className="question" onClick={() => toggleAccordion(index)}>
        {item.title}
      </div>

      <div
        className="answer"
        dangerouslySetInnerHTML={{ __html: item.content }}
      />
    </div>
  ));

  return <div className="faq">{faqItem}</div>;
};
