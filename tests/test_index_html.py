from pathlib import Path
from bs4 import BeautifulSoup

def test_index_contains_key_elements():
    root_dir = Path(__file__).resolve().parents[1]
    html_file = root_dir / "index.html"
    html_content = html_file.read_text(encoding="utf-8")
    soup = BeautifulSoup(html_content, "html.parser")

    assert soup.find(id="particles-js") is not None
    assert soup.find(id="helpPopup") is not None
    assert soup.find(id="downloadPDF") is not None
