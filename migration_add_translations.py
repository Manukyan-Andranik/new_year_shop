#!/usr/bin/env python3
"""
Database migration script to add translation fields to products table.
Run this script to add the new translation columns to your existing products table.
"""

import os
import sys
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def run_migration():
    """Add translation fields to products table"""
    
    # Database connection
    DB_USER = os.getenv('DB_USER', 'postgres')
    DB_PASSWORD = os.getenv('DB_PASSWORD', 'postgres')
    DB_HOST = os.getenv('DB_HOST', 'localhost')
    DB_PORT = os.getenv('DB_PORT', '5432')
    DB_NAME = os.getenv('DB_NAME', 'christmas_shop')
    
    DATABASE_URI = f'postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}'
    
    try:
        engine = create_engine(DATABASE_URI)
        
        with engine.connect() as conn:
            # Start transaction
            trans = conn.begin()
            
            try:
                # Add translation columns
                migration_sql = """
                ALTER TABLE products 
                ADD COLUMN IF NOT EXISTS name_en VARCHAR(200),
                ADD COLUMN IF NOT EXISTS name_hy VARCHAR(200),
                ADD COLUMN IF NOT EXISTS name_ru VARCHAR(200),
                ADD COLUMN IF NOT EXISTS description_en TEXT,
                ADD COLUMN IF NOT EXISTS description_hy TEXT,
                ADD COLUMN IF NOT EXISTS description_ru TEXT;
                """
                
                conn.execute(text(migration_sql))
                
                # Update existing products to copy name and description to translation fields
                update_sql = """
                UPDATE products 
                SET 
                    name_en = COALESCE(name_en, name),
                    name_hy = COALESCE(name_hy, name),
                    name_ru = COALESCE(name_ru, name),
                    description_en = COALESCE(description_en, description),
                    description_hy = COALESCE(description_hy, description),
                    description_ru = COALESCE(description_ru, description)
                WHERE name_en IS NULL OR name_hy IS NULL OR name_ru IS NULL;
                """
                
                conn.execute(text(update_sql))
                
                # Commit transaction
                trans.commit()
                print("✅ Migration completed successfully!")
                print("Added translation fields: name_en, name_hy, name_ru, description_en, description_hy, description_ru")
                print("Existing products have been updated with default translations.")
                
            except Exception as e:
                trans.rollback()
                print(f"❌ Migration failed: {e}")
                sys.exit(1)
                
    except Exception as e:
        print(f"❌ Database connection failed: {e}")
        sys.exit(1)

if __name__ == "__main__":
    print("🔄 Starting database migration to add translation fields...")
    run_migration()
