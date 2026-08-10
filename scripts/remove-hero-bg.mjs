import sharp from "sharp"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const heroesDir = path.join(__dirname, "../public/assets/dashboards/heroes")

const jobs = process.argv.slice(2).length
  ? process.argv.slice(2).map((arg) => {
      const [inputName, outputName] = arg.split(":")
      return {
        input: path.join(heroesDir, inputName),
        output: path.join(heroesDir, outputName ?? inputName.replace("-source", "-hero")),
      }
    })
  : [
      {
        input: path.join(heroesDir, "mobile-source.png"),
        output: path.join(heroesDir, "mobile-hero.png"),
      },
    ]

function clamp(v) {
  return Math.max(0, Math.min(255, v))
}

function backgroundAlpha(r, g, b) {
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const spread = max - min
  const avg = (r + g + b) / 3

  // Pure/near white backdrop
  if (spread < 18 && avg > 235) return 0

  // Checkerboard + soft studio floor (gray/white blocks)
  if (spread < 58 && avg > 118) {
    const t = Math.min(1, Math.max(0, (avg - 118) / 112))
    return Math.round(255 * (1 - t))
  }

  // Light blue-gray spill around generated assets
  if (spread < 35 && avg > 200 && b >= r && b >= g) {
    const t = Math.min(1, (avg - 200) / 45)
    return Math.round(255 * (1 - t * 0.85))
  }

  return 255
}

async function removeBackground(input, output) {
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true })

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    let alpha = backgroundAlpha(r, g, b)

    if (alpha <= 0) {
      data[i + 3] = 0
      continue
    }

    if (alpha < 255) {
      const a = alpha / 255
      data[i] = clamp(Math.round((r - 255 * (1 - a)) / a))
      data[i + 1] = clamp(Math.round((g - 255 * (1 - a)) / a))
      data[i + 2] = clamp(Math.round((b - 255 * (1 - a)) / a))
    }

    data[i + 3] = alpha
  }

  await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile(output)

  console.log("Saved:", output)
}

for (const job of jobs) {
  await removeBackground(job.input, job.output)
}
