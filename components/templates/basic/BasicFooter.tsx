interface BasicFooterProps {
  businessName: string;
}

export default function BasicFooter({ businessName }: BasicFooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="basic-footer">
      <p>&copy; {currentYear} {businessName}. All rights reserved.</p>
    </footer>
  );
}
