"""Genera el CV con información proporcionada por David y sus repositorios públicos."""
from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public' / 'cv-david-velez.pdf'
c = canvas.Canvas(str(OUT), pagesize=A4)
c.setTitle('David Velez - Perfil profesional')
c.setAuthor('David Velez')
W, H = A4
INK, MUTED, ACCENT = '#303b30', '#66715f', '#cc512c'
c.setFillColor(HexColor('#f7f6f1')); c.rect(0, 0, W, H, fill=1, stroke=0)
c.setFillColor(HexColor(ACCENT)); c.rect(42, H-59, 27, 4, fill=1, stroke=0)
c.setFillColor(HexColor(INK)); c.setFont('Helvetica-Bold', 30); c.drawString(42, H-103, 'David Velez')
c.setFillColor(HexColor(ACCENT)); c.setFont('Helvetica', 11); c.drawString(42, H-126, 'INGENIERÍA DE SOFTWARE  /  IA  /  HARDWARE')
c.setFillColor(HexColor(MUTED)); c.setFont('Helvetica', 9)
c.drawString(42, H-150, 'josue.guerrerov@campusucc.edu.co')
c.drawString(42, H-166, 'github.com/Dvkllz')
c.linkURL('mailto:josue.guerrerov@campusucc.edu.co', (42,H-153,285,H-141), relative=0)
c.linkURL('https://github.com/Dvkllz', (42,H-169,160,H-157), relative=0)
y = H-201
body = ParagraphStyle('Body', fontName='Helvetica', fontSize=9.4, leading=14.5, textColor=HexColor(MUTED))

def text(value, gap=12):
    global y
    p = Paragraph(value, body); _, height = p.wrap(W-84, 700)
    p.drawOn(c, 42, y-height); y -= height+gap

def section(title):
    global y
    c.setStrokeColor(HexColor('#d8ddcf')); c.line(42,y,W-42,y); y-=22
    c.setFillColor(HexColor(ACCENT)); c.setFont('Helvetica-Bold',9); c.drawString(42,y,title); y-=16

section('PERFIL')
text('Estudiante de quinto semestre de Ingeniería de Software, con un año de experiencia laboral. Conocimientos en machine learning, inteligencia artificial, C, Python y Java. Experiencia y conocimientos en mantenimiento, reparación y construcción de hardware. Interés en conectar software y componentes para resolver problemas.')
section('HABILIDADES')
text('<b>Programación:</b> C, Python y Java.<br/><b>Inteligencia artificial:</b> conocimientos en IA y machine learning.<br/><b>Hardware:</b> mantenimiento, reparación y construcción de equipos.')
section('FORMACIÓN Y EXPERIENCIA')
text('<b>Ingeniería de Software</b> - quinto semestre, en curso.<br/><b>Experiencia laboral:</b> un año. Empresa, cargo y fechas por detallar.')
section('PROYECTOS SELECCIONADOS')
for title, description, url in [
    ('CuentAI', 'Organización de facturas, extracción con IA, calendario y versión Android. TypeScript, React y Capacitor.', 'CuentAI'),
    ('Asistente Virtual', 'Mascota de escritorio con animaciones, física, conversación y voz. Python y PyQt6.', 'AsistenteVirtual'),
    ('Ecos de Nébula', 'Aventura 3D de memoria y combate, patrones generados con IA y modo local. Unity y C#.', 'JuegoDefinitivo'),
    ('Sistema Automotriz', 'Aplicación de patrones Bridge y Adapter mediante una interfaz de escritorio. Java y Swing.', 'SistemaAutomotriz'),
]:
    text(f'<b>{title}</b><br/>{description}<br/><link href="https://github.com/Dvkllz/{url}" color="{ACCENT}">github.com/Dvkllz/{url}</link>', 13)

c.setStrokeColor(HexColor('#d8ddcf')); c.line(42,49,W-42,49)
c.setFont('Helvetica',7); c.setFillColor(HexColor(MUTED))
c.drawString(42,34,'Perfil inicial basado en información proporcionada. Noviembre de 2026.')
c.drawRightString(W-42,34,'1 / 1')
assert y > 65, f'Contenido demasiado extenso: {y}'
c.save()
print(OUT)
