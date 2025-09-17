const EmailLink = ({ customer }: { customer?: Customer }) => {
  if (!customer?.email) return null;

  return (
    <a href={`mailto:${customer?.email}`} className="text-p500 hover:underline">
      {customer?.email}
    </a>
  );
};

export default EmailLink;
