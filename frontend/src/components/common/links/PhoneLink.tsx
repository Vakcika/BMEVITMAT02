const PhoneLink = ({ customer }: { customer?: Customer }) => {
  return (
    <a
      href={`tel:${customer?.phone_number}`}
      className="text-p500 hover:underline"
    >
      {customer?.phone_number}
    </a>
  );
};

export default PhoneLink;
