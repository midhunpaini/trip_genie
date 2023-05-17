import pdfkit

# # Convert HTML file to PDF
config = pdfkit.configuration(wkhtmltopdf=r'C:\Program Files\wkhtmltopdf\bin\wkhtmltopdf.exe')

pdfkit.from_file('input.html', 'output.pdf',  options={'debug-javascript': True})

