function Pagination({ page, totalPages, onChange, siblingCount = 1 }) {
  if (totalPages <= 1) return null;
  const pages = [];
  const start = Math.max(1, page - siblingCount);
  const end = Math.min(totalPages, page + siblingCount);
  for (let i = start; i <= end; i += 1) pages.push(i);

  return <nav className="pagination" aria-label="Pagination">
    <button type="button" disabled={page === 1} onClick={() => onChange?.(page - 1)}>Previous</button>
    {start > 1 && <><button type="button" onClick={() => onChange?.(1)}>1</button>{start > 2 && <span>…</span>}</>}
    {pages.map((item) => <button key={item} type="button" aria-current={item === page ? "page" : undefined}
      className={item === page ? "is-active" : ""} onClick={() => onChange?.(item)}>{item}</button>)}
    {end < totalPages && <>{end < totalPages - 1 && <span>…</span>}<button type="button" onClick={() => onChange?.(totalPages)}>{totalPages}</button></>}
    <button type="button" disabled={page === totalPages} onClick={() => onChange?.(page + 1)}>Next</button>
  </nav>;
}
export default Pagination;
