export const generateAnalyticsReportHtml = (BOOKS_DATA, totalAccess, chartUri) => {
  const mostAccessedBook = BOOKS_DATA[0];
  const leastAccessedBook = BOOKS_DATA[BOOKS_DATA.length - 1];
  const fastestBook = BOOKS_DATA.reduce((min, book) =>
    book.book_avg_read_time && book.book_avg_read_time < min.book_avg_read_time ? book : min,
    BOOKS_DATA[0]
  );

  const formatTime = (secs) => {
    const h = String(Math.floor(secs / 3600)).padStart(2, "0");
    const m = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
    const s = String(secs % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const interpretationText = (() => {
    let text = `The data indicates that <strong>${mostAccessedBook.book_title}</strong> is the most frequently accessed book, suggesting it is either the most popular or most relevant to readers. `;
    text += `In contrast, <strong>${leastAccessedBook.book_title}</strong> has the fewest accesses, which may point to lower interest or limited relevance. `;

    if (fastestBook.book_title === mostAccessedBook.book_title) {
      text += `Interestingly, this same book is also the fastest to read (${formatTime(fastestBook.book_avg_read_time)} minutes), showing strong engagement.`;
    } else if (fastestBook.book_title === leastAccessedBook.book_title) {
      text += `Surprisingly, the least accessed book is also the fastest to read (${formatTime(fastestBook.book_avg_read_time)} minutes), suggesting it may be overlooked despite being quick to complete.`;
    } else {
      text += `The fastest book to read is <strong>${fastestBook.book_title}</strong> (${formatTime(fastestBook.book_avg_read_time)} minutes), suggesting shorter books may encourage quicker completion.`;
    }
    return text;
  })();

  return `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
      <h1 style="text-align:center;">📊 Analytics Report</h1>
      <h2>All Books (Sorted from Most Accessed)</h2>
      <ul>
        ${BOOKS_DATA.map(book =>
    `<li>${book.book_title} — Access Count: ${book.book_count} (Avg Read: ${formatTime(book.book_avg_read_time) || 'N/A'} mins)</li>`
  ).join('')}
      </ul>
      <p><strong>Total Accesses:</strong> ${totalAccess}</p>

      <h3>📈 Summary Statistics</h3>
      <ul>
        <li><strong>Total Books:</strong> ${BOOKS_DATA.length}</li>
        <li><strong>Most Accessed:</strong> ${mostAccessedBook.book_title} (${mostAccessedBook.book_count})</li>
        <li><strong>Least Accessed:</strong> ${leastAccessedBook.book_title} (${leastAccessedBook.book_count})</li>
        <li><strong>Fastest Book Read:</strong> ${fastestBook.book_title} (${formatTime(fastestBook.book_avg_read_time)} mins)</li>
      </ul>

      <h3>📝 Interpretation</h3>
      <p>${interpretationText}</p>

      <h3>📊 Book Access Distribution</h3>
      <div style="text-align:center;">
        <img src="${chartUri}" style="width:90%;border:1px solid #ccc;" />
      </div>

      <footer style="text-align:center; font-size:12px; margin-top:20px;">
        Generated on ${new Date().toLocaleDateString()}
      </footer>
    </div>
  `;
};
