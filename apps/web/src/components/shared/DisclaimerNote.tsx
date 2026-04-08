type DisclaimerNoteProps = {
  text: string;
  editPath?: string;
  className?: string;
};

export default function DisclaimerNote({
  text,
  editPath,
  className = "",
}: DisclaimerNoteProps) {
  return (
    <div className={`text-left ${className}`.trim()}>
      <p className="text-[9px] leading-4 text-slate-500">
        * {text}
      </p>
      {editPath ? (
        <p className="text-[9px] leading-4 text-slate-500">* Edit: {editPath}</p>
      ) : null}
    </div>
  );
}
